import { forwardRef, type Ref } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "primary"
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    classNames?: {
        wrapper?: string;
        content?: string;
    }
}

export const Input = forwardRef((props: IInputProps, ref: Ref<HTMLInputElement>) => {
    const {
        className = "",
        classNames = {
            wrapper: "",
            content: ""
        },
        variant = "primary",
        startContent,
        endContent,
        ...otherProps
    } = props;

    const themeCn = cn(
        "light:bg-green-20 border-[1px] border-solid border-[rgb(214,214,214)] placeholder:text-neutral-400 text-black",
        "dark:bg-green-980 dark:border-gray-550 placeholder:dark:text-gray-400 dark:text-white"
    );
    
    const classname = cn(
        styles.input,
        className,
        styles[`variant-${variant}`],
        themeCn
    );
    
    if (startContent || endContent) {
        return (
            <div className={cn(styles.wrapper, "bg-linear-to-r dark:from-gray-550 dark:to-gray-650 dark:p-[1px]", classNames?.wrapper)}>
                <div className={cn(styles.content, themeCn, classNames?.content)}>
                    <div className={styles.startContent}>{startContent}</div>
                    <input className={classname} ref={ref} {...otherProps} />
                    <div className={styles.endContent}>{endContent}</div>
                </div>
            </div>
        )
    }

    return (
        <div className={cn(styles.wrapper, "bg-linear-to-r dark:from-gray-550 dark:to-gray-650 dark:p-[1px]", classNames?.wrapper,)}>
            <input className={classname} ref={ref} {...otherProps} />
        </div>
    )
})