import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast as useToastUI,
} from "@/components/ui/toast";
import type { InterfaceToastProps } from "@gluestack-ui/toast/lib/types";
import { useId } from "react";

type UseToastProps = Pick<InterfaceToastProps, "placement" | 'duration' > & {
    title: string;
    description: string;
};

export const useToast = () => {
  const toast = useToastUI();
  const uniqueToastId = useId();
  const show = (props: UseToastProps) => {
    toast.show({
      id: uniqueToastId,
      placement: props.placement ?? 'top',
      render({ id }) {
        return (
          <Toast nativeID={`toast-${id}`} action="muted" variant="solid" >
            <ToastTitle>{props.title}</ToastTitle>
            <ToastDescription>{props.description}</ToastDescription>
          </Toast>
        );
      },
    });
  };
  return { show };
};
