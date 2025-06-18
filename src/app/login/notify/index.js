'use client';

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const Notify = () => {
      const searchParams = useSearchParams();
      const obj = JSON.parse(searchParams.get('obj') || JSON.stringify({}));
    
      useEffect(() => {
        if (obj.text) {
            if (obj.success) {
                toast.success(obj.text);
            } else {
                toast.warning(obj.text);
            }
        }
      }, [obj]);
    return undefined;
};

export default Notify;