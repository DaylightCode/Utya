"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import * as THREE from "three"

type GameState = "menu" | "playing" | "gameover"

const GRAVITY = -9.8
const JUMP_VELOCITY = 4

const GAME_WIDTH = 6
const GAME_HEIGHT = 8

const BIRD_X = -2
const BIRD_WIDTH = 0.8
const BIRD_HEIGHT = 0.62

const PIPE_WIDTH = 0.65
const PIPE_HEIGHT = 1.45
const PIPE_SPEED = 2
const PIPE_SPAWN_INTERVAL = 2
const PIPE_SPACING = PIPE_SPEED * PIPE_SPAWN_INTERVAL
const PIPE_EXTENSION_HEIGHT = 50
const PIPE_GAP_TOP_EDGE = -0.175
const PIPE_GAP_BOTTOM_EDGE = 1.275
const PIPE_GAP_RANDOM_RANGE = 1.4

const COLLISION_MARGIN_X = 0.05
const COLLISION_MARGIN_Y = 0.05

function ResponsiveCamera() {
  const { camera, size } = useThree()

  useEffect(() => {
    const widthZoom = size.width / GAME_WIDTH
    const heightZoom = size.height / GAME_HEIGHT
    const zoom = Math.min(widthZoom, heightZoom)
    camera.zoom = zoom
    camera.updateProjectionMatrix()
  }, [size, camera])

  return null
}

function Bird({ meshRef, gameState, onGameOver, jumpRef }: {
  meshRef: React.RefObject<THREE.Mesh | null>
  gameState: GameState
  onGameOver: () => void
  jumpRef: React.MutableRefObject<() => void>
}) {
  const velocity = useRef(0)
  const texture = useLoader(THREE.TextureLoader, "/bird.png")

  function jump() {
    velocity.current = JUMP_VELOCITY
  }

  useEffect(() => {
    jumpRef.current = jump
  })

  useEffect(() => {
    if (!meshRef.current) return
    if (gameState === "playing" || gameState === "gameover") {
      meshRef.current.position.y = 0
      meshRef.current.rotation.z = 0
      velocity.current = 0
    }
  }, [gameState])

  useEffect(() => {
    function handleJump(event: KeyboardEvent) {
      if (event.code === "Space") {
        event.preventDefault()
        jump()
      }
    }

    window.addEventListener("keydown", handleJump)
    return () => window.removeEventListener("keydown", handleJump)
  }, [])

  useFrame((state, delta) => {
    if (!meshRef.current) return
    if (gameState !== "playing") return

    velocity.current += GRAVITY * delta
    meshRef.current.position.y += velocity.current * delta
    meshRef.current.rotation.z = THREE.MathUtils.clamp(velocity.current * 0.15, -0.5, 0.8)

    const fallLimit = -state.viewport.height / 2 + 1.5
    if (meshRef.current.position.y < fallLimit) {
      onGameOver()
    }
  })

  return (
    <mesh ref={meshRef} position={[BIRD_X, 0, 0]}>
      <planeGeometry args={[BIRD_WIDTH, BIRD_HEIGHT]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  )
}

function PipePair({ x, gapOffset, gameState, despawnX, onRefsReady, onOffscreen }: {
  x: number
  gapOffset: number
  gameState: GameState
  despawnX: number
  onRefsReady: (bottomRef: React.RefObject<THREE.Group | null>, topRef: React.RefObject<THREE.Group | null>) => void
  onOffscreen: () => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const bottomGroupRef = useRef<THREE.Group>(null)
  const topGroupRef = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, "/pipe.png")

  const bottomEdgeY = PIPE_GAP_TOP_EDGE + gapOffset
  const topEdgeY = PIPE_GAP_BOTTOM_EDGE + gapOffset

  const bottomVisibleY = bottomEdgeY - PIPE_HEIGHT / 2
  const bottomExtensionY = bottomEdgeY - PIPE_HEIGHT - PIPE_EXTENSION_HEIGHT / 2

  const topVisibleY = topEdgeY + PIPE_HEIGHT / 2
  const topExtensionY = topEdgeY + PIPE_HEIGHT + PIPE_EXTENSION_HEIGHT / 2

  useEffect(() => {
    onRefsReady(bottomGroupRef, topGroupRef)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    if (gameState !== "playing") return

    groupRef.current.position.x -= PIPE_SPEED * delta
    if (groupRef.current.position.x < despawnX) {
      onOffscreen()
    }
  })

  return (
    <group ref={groupRef} position={[x, 0, 0]}>
      <group ref={bottomGroupRef}>
        <mesh position={[0, bottomVisibleY, 0]}>
          <planeGeometry args={[PIPE_WIDTH, PIPE_HEIGHT]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
        <mesh position={[0, bottomExtensionY, 0]}>
          <planeGeometry args={[PIPE_WIDTH, PIPE_EXTENSION_HEIGHT]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
      <group ref={topGroupRef}>
        <mesh position={[0, topVisibleY, 0]} rotation={[0, 0, Math.PI]}>
          <planeGeometry args={[PIPE_WIDTH, PIPE_HEIGHT]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
        <mesh position={[0, topExtensionY, 0]}>
          <planeGeometry args={[PIPE_WIDTH, PIPE_EXTENSION_HEIGHT]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

type PipeData = { id: number; x: number; scoreAt: number; gapOffset: number }

function PipeManager({ gameState, birdX, onRefsChange, onScore }: {
  gameState: GameState
  birdX: number
  onRefsChange: (refs: React.RefObject<THREE.Group | null>[]) => void
  onScore: () => void
}) {
  const viewport = useThree((state) => state.viewport)
  const spawnX = viewport.width / 2 + 0.5
  const despawnX = -viewport.width / 2 - 0.5

  const [pipes, setPipes] = useState<PipeData[]>([])
  const allRefs = useRef<Map<number, React.RefObject<THREE.Group | null>[]>>(new Map())
  const nextId = useRef(0)
  const spawnTimer = useRef(0)
  const gameTime = useRef(0)
  const scoredIds = useRef<Set<number>>(new Set())

  function randomGapOffset() {
    return (Math.random() * 2 - 1) * PIPE_GAP_RANDOM_RANGE
  }

  function spawnPipe(x: number) {
    const scoreAt = gameTime.current + (x - birdX) / PIPE_SPEED
    setPipes((prev) => [...prev, { id: nextId.current, x, scoreAt, gapOffset: randomGapOffset() }])
    nextId.current += 1
  }

  function startRound() {
    allRefs.current.clear()
    onRefsChange([])
    nextId.current = 0
    gameTime.current = 0
    scoredIds.current = new Set()

    const positions: number[] = []
    let x = 0
    while (x < spawnX) {
      positions.push(x)
      x += PIPE_SPACING
    }

    const lastX = positions[positions.length - 1]
    spawnTimer.current = PIPE_SPAWN_INTERVAL - (PIPE_SPACING + lastX - spawnX) / PIPE_SPEED

    setPipes(positions.map((posX) => ({
      id: nextId.current++,
      x: posX,
      scoreAt: (posX - birdX) / PIPE_SPEED,
      gapOffset: randomGapOffset(),
    })))
  }

  function handleRefsReady(id: number, bottomRef: React.RefObject<THREE.Group | null>, topRef: React.RefObject<THREE.Group | null>) {
    allRefs.current.set(id, [bottomRef, topRef])
    onRefsChange(Array.from(allRefs.current.values()).flat())
  }

  function removePipe(id: number) {
    setPipes((prev) => prev.filter((p) => p.id !== id))
    allRefs.current.delete(id)
    onRefsChange(Array.from(allRefs.current.values()).flat())
  }

  useEffect(() => {
    startRound()
  }, [])

  const prevGameState = useRef(gameState)
  useEffect(() => {
    if (gameState === "playing" && prevGameState.current !== "playing") {
      startRound()
    }
    prevGameState.current = gameState
  }, [gameState])

  useFrame((_, delta) => {
    if (gameState !== "playing") return

    gameTime.current += delta
    spawnTimer.current += delta

    if (spawnTimer.current >= PIPE_SPAWN_INTERVAL) {
      spawnTimer.current = 0
      spawnPipe(spawnX)
    }

    for (const pipe of pipes) {
      if (!scoredIds.current.has(pipe.id) && gameTime.current >= pipe.scoreAt) {
        scoredIds.current.add(pipe.id)
        onScore()
      }
    }
  })

  return (
    <>
      {pipes.map((pipe) => (
        <PipePair
          key={pipe.id}
          x={pipe.x}
          gapOffset={pipe.gapOffset}
          gameState={gameState}
          despawnX={despawnX}
          onRefsReady={(bottomRef, topRef) => handleRefsReady(pipe.id, bottomRef, topRef)}
          onOffscreen={() => removePipe(pipe.id)}
        />
      ))}
    </>
  )
}

function CollisionChecker({ meshRef, obstacleRefs, gameState, onCollision }: {
  meshRef: React.RefObject<THREE.Mesh | null>
  obstacleRefs: React.RefObject<THREE.Group | null>[]
  gameState: GameState
  onCollision: () => void
}) {
  useFrame(() => {
    if (gameState !== "playing") return
    if (!meshRef.current) return

    const birdBox = new THREE.Box3().setFromObject(meshRef.current)
    birdBox.min.x += COLLISION_MARGIN_X
    birdBox.max.x -= COLLISION_MARGIN_X
    birdBox.min.y += COLLISION_MARGIN_Y
    birdBox.max.y -= COLLISION_MARGIN_Y

    for (const ref of obstacleRefs) {
      if (!ref.current) continue

      const obstacleBox = new THREE.Box3().setFromObject(ref.current)
      obstacleBox.min.x += COLLISION_MARGIN_X
      obstacleBox.max.x -= COLLISION_MARGIN_X
      obstacleBox.min.y += COLLISION_MARGIN_Y
      obstacleBox.max.y -= COLLISION_MARGIN_Y

      if (birdBox.intersectsBox(obstacleBox)) {
        onCollision()
        return
      }
    }
  })

  return null
}

function PlayButton({ label, onClick }: { label: string; onClick: (e: React.PointerEvent) => void }) {
  return (
    <button
      onPointerDown={(e) => { e.stopPropagation(); onClick(e) }}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "clamp(1.1rem, 5vw, 1.5rem)",
      }}
      className="bg-[#F8C82E] px-6 py-2 font-bold border-2 rounded-full shadow-[0_2px_0_0_#000] hover:shadow-[0_0px_0_0_#000] hover:translate-y-[2px] transition-all duration-150 ease-out cursor-pointer flex items-center gap-2"
    >
      {label === "Play" && (
        <svg width="20" height="20" viewBox="0 0 43 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 51.861V1.50235C0.5 0.698763 1.39986 0.223396 2.06364 0.676329L41.6977 27.7208C42.3034 28.134 42.2731 29.037 41.6411 29.4087L2.00702 52.7229C1.34039 53.115 0.5 52.6344 0.5 51.861Z" fill="black" stroke="black"/>
        </svg>
      )}
      {label}
    </button>
  )
}

function Game() {
  const birdRef = useRef<THREE.Mesh>(null)
  const jumpRef = useRef<() => void>(() => {})
  const [obstacleRefs, setObstacleRefs] = useState<React.RefObject<THREE.Group | null>[]>([])
  const [gameState, setGameState] = useState<GameState>("menu")
  const [score, setScore] = useState(0)

  function startGame() {
    setScore(0)
    setGameState("playing")
  }

  function handlePointerDown() {
    if (gameState === "playing") {
      jumpRef.current()
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100dvh",
        position: "relative",
        zIndex: 0,
        touchAction: "none",
        overscrollBehavior: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      className="bg-[var(--light-blue)]"
      onPointerDown={handlePointerDown}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Canvas orthographic camera={{ position: [0, 0, 10] }} dpr={[1, 2]}>
        <ResponsiveCamera />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <group position={[0, -1.5, 0]}>
          <Bird
            meshRef={birdRef}
            gameState={gameState}
            onGameOver={() => setGameState("gameover")}
            jumpRef={jumpRef}
          />
          <PipeManager
            gameState={gameState}
            birdX={BIRD_X}
            onRefsChange={setObstacleRefs}
            onScore={() => setScore((s) => s + 1)}
          />
        </group>
        <CollisionChecker
          meshRef={birdRef}
          obstacleRefs={obstacleRefs}
          gameState={gameState}
          onCollision={() => setGameState("gameover")}
        />
      </Canvas>

      {gameState === "menu" && <PlayButton label="Play" onClick={startGame} />}

      {gameState === "gameover" && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} className="flex flex-col items-center gap-4 px-4 text-center">
          <span style={{ fontSize: "clamp(1.5rem, 7vw, 2rem)" }} className="font-bold text-white mb-24">Game Over</span>
          <PlayButton label="Restart" onClick={startGame} />
        </div>
      )}

      {gameState === "playing" && (
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "clamp(1.75rem, 8vw, 2.25rem)",
          }}
          className="font-bold text-white pointer-events-none"
        >
          {score}
        </div>
      )}
    </div>
  )
}

export default Game