import {
    AnimationPlaybackControls,
    TargetAndTransition,
    Transition,
} from "motion-dom"

export type ViewAnimationStartCallback = (
    animation: AnimationPlaybackControls,
    type: "enter" | "exit" | "share" | "update"
) => void

export interface AnimateViewProps {
    transition?: Transition
    enter?: TargetAndTransition | ((types: string[]) => TargetAndTransition)
    exit?: TargetAndTransition | ((types: string[]) => TargetAndTransition)
    share?: TargetAndTransition | ((types: string[]) => TargetAndTransition)
    update?: TargetAndTransition | ((types: string[]) => TargetAndTransition)
    onAnimationStart?: ViewAnimationStartCallback
    name?: string
}
