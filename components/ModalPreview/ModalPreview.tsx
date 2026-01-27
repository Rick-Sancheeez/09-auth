'use client';

import { useRouter } from 'next/navigation';
import {createPortal} from 'react-dom'
import css from './ModalPreview.module.css';

type Props = {
  children: React.ReactNode;
};

const ModalPreview = ({ children }: Props) => {
  const router = useRouter();
  
  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if(event.currentTarget === event.target) {
        router.back();
    } else {
        return;
    }
  }

  return createPortal (
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
            >
            <div className={css.modal}>

                {children}
            </div>
        </div>,
        document.body
    );
}

export default ModalPreview;