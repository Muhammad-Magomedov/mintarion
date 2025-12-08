import { forwardRef, type Ref } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    variant?: "primary"
}

export const Textarea = forwardRef((props: ITextareaProps, ref: Ref<HTMLTextAreaElement>) => {
    const {
        className = "",
        variant = "primary",
        ...otherProps
    } = props;

    const themeCn = cn(
        "light:bg-green-20 border-[1px] border-solid light:border-[rgb(214,214,214)]",
        "dark:bg-green-980 dark:border-gray-550"
    );
    
    const classname = cn(
        styles.textarea,
        className,
        styles[`variant-${variant}`],
        themeCn
    );
    
    return (
        <textarea className={classname} ref={ref} {...otherProps} />
    )
})