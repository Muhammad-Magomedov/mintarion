"use client"

import { useState } from "react";
import cn from "classnames";
import { Button, type IButtonProps } from "@/shared/ui/Button/Button";
import styles from "./styles.module.scss";

export interface IFollowButtonProps extends IButtonProps {
    userId: string;
}

export const FollowButton: React.FC<IFollowButtonProps> = ({
    className,
    userId,
    ...props
}) => {
    const [isFollowed, setIsFollowed] = useState<boolean>(false);

    return (
        <Button className={cn(styles.btn, className)}>
            {isFollowed ? "Unfollow" : "Follow"}
        </Button>
    )
}