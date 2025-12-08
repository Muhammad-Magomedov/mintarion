import React from 'react';
import cn from "classnames";
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import styles from './styles.module.scss';

const overlayVariants = cva(styles.overlay, {
  variants: {
    variant: {
      default: styles.overlayDefault,
      blur: styles.overlayBlur,
    }
  },
  defaultVariants: {
    variant: 'default',
  }
});

const contentVariants = cva(styles.content, {
  variants: {
    size: {
      sm: styles.contentSm,
      md: styles.contentMd,
      lg: styles.contentLg,
      xl: styles.contentXl,
      full: styles.contentFull,
    },
    variant: {
      primary: "bg-linear-to-b from-green-20 to-green-40 border-green-800 dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650"
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  }
});

const modalVariants = cva('', {
  variants: {
    type: {
      default: '',
      confirmation: styles.modalConfirmation,
      alert: styles.modalAlert,
      form: styles.modalForm,
    },
    animation: {
      default: styles.animationDefault,
      slide: styles.animationSlide,
      fade: styles.animationFade,
      zoom: styles.animationZoom,
    },
    variant: {
      primary: "bg-linear-to-b from-green-20 to-green-40 border-green-800 dark:from-zinc-900 dark:to-neutral-900 dark:border-gray-650",
    },
  },
  defaultVariants: {
    type: 'default',
    animation: 'default',
  }
});

export interface IModalRootProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export interface IModalOverlayProps extends VariantProps<typeof overlayVariants> {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
}

export interface IModalContentProps extends VariantProps<typeof contentVariants> {
  className?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  onEscapeKeyDown?: (e: KeyboardEvent) => void;
}

export interface IModalTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export interface IModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface IModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface IModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface IModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface IModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface IModalCloseProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export interface IModalProps extends 
  Omit<VariantProps<typeof overlayVariants>, 'variant'>,
  Omit<VariantProps<typeof contentVariants>, 'variant'>,
  VariantProps<typeof modalVariants> {
  
  overlayVariant?: 'default' | 'blur';
  contentVariant?: 'primary';
  
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  
  trigger?: React.ReactNode;
  triggerAsChild?: boolean;
  triggerClassName?: string;
}

export const ModalRoot: React.FC<IModalRootProps> = ({ 
  children, 
  open, 
  onOpenChange, 
  modal = true 
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal={modal}>
      {children}
    </Dialog.Root>
  );
};

export const ModalTrigger: React.FC<IModalTriggerProps> = ({ 
  children, 
  asChild = false, 
  className 
}) => {
  return (
    <Dialog.Trigger asChild={asChild} className={className}>
      {children}
    </Dialog.Trigger>
  );
};

export const ModalPortal = Dialog.Portal;

export const ModalOverlay: React.FC<IModalOverlayProps> = ({ 
  children, 
  variant, 
  className 
}) => {
  return (
    <Dialog.Overlay 
      className={`${overlayVariants({ variant })} ${className || ''}`}
    >
      {children}
    </Dialog.Overlay>
  );
};

export const ModalContent: React.FC<IModalContentProps> = ({ 
  children, 
  size, 
  variant, 
  className,
  showCloseButton = true
}) => {
  return (
    <Dialog.Content 
      className={`${contentVariants({ size, variant })} ${className || ''}`}
    >
      {children}
      {showCloseButton && (
        <Dialog.Close className={styles.closeButton}>
          <X className="text-green-750 dark:text-white" size={20} />
        </Dialog.Close>
      )}
    </Dialog.Content>
  );
};

export const ModalHeader: React.FC<IModalHeaderProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${styles.header} ${className || ''}`}>
      {children}
    </div>
  );
};

export const ModalTitle: React.FC<IModalTitleProps> = ({ 
  children, 
  className 
}) => {
  return (
    <Dialog.Title className={`${styles.title} ${className || ''}`}>
      {children}
    </Dialog.Title>
  );
};

export const ModalDescription: React.FC<IModalDescriptionProps> = ({ 
  children, 
  className 
}) => {
  return (
    <Dialog.Description className={`${styles.description} ${className || ''}`}>
      {children}
    </Dialog.Description>
  );
};

export const ModalBody: React.FC<IModalBodyProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${styles.body} ${className || ''}`}>
      {children}
    </div>
  );
};

export const ModalFooter: React.FC<IModalFooterProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={`${styles.footer} ${className || ''}`}>
      {children}
    </div>
  );
};

export const ModalClose: React.FC<IModalCloseProps> = ({ 
  children, 
  asChild = false, 
  className 
}) => {
  return (
    <Dialog.Close asChild={asChild} className={className}>
      {children}
    </Dialog.Close>
  );
};

export const Modal: React.FC<IModalProps> = ({
  open,
  onOpenChange,
  modal = true,
  
  title,
  description,
  children,
  footer,
  
  overlayVariant = 'default',
  contentVariant = 'primary',
  size,
  type,
  animation,
  
  overlayClassName,
  contentClassName,
  headerClassName,
  titleClassName,
  bodyClassName,
  footerClassName,
  
  showCloseButton = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  
  trigger,
  triggerAsChild = false,
  triggerClassName,
}) => {
  const modalClass = modalVariants({ type, animation });
  
  return (
    <ModalRoot 
      open={open} 
      onOpenChange={onOpenChange} 
      modal={modal}
    >
      {trigger && (
        <ModalTrigger 
          asChild={triggerAsChild} 
          className={triggerClassName}
        >
          {trigger}
        </ModalTrigger>
      )}
      
      <ModalPortal>
        <ModalOverlay 
          variant={overlayVariant}
          className={`${modalClass} ${overlayClassName || ''}`}
          onClick={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
        >
          <ModalContent
            size={size}
            variant={contentVariant}
            className={contentClassName}
            showCloseButton={showCloseButton}
            onEscapeKeyDown={closeOnEscape ? undefined : (e) => e.preventDefault()}
          >
            {(title || description) && (
              <ModalHeader className={headerClassName}>
                {title ? (
                <ModalTitle className={styles.title}>{title}</ModalTitle>
              ) : (
                <VisuallyHidden>
                  <Dialog.Title>Dialog</Dialog.Title>
                </VisuallyHidden>
              )}
                {description && <ModalDescription>{description}</ModalDescription>}
              </ModalHeader>
            )}
            
            <ModalBody className={cn(styles.body, bodyClassName)}>
              {children}
            </ModalBody>
            
            {footer && (
              <ModalFooter className={footerClassName}>
                {footer}
              </ModalFooter>
            )}
          </ModalContent>
        </ModalOverlay>
      </ModalPortal>
    </ModalRoot>
  );
};

export default Modal;