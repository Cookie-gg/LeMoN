import React from 'react';

// グローバルの型定義
declare global {
  type InputTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  type FormTypes = React.FormEvent;
  type MountedType = {
    isMounted: boolean
  };
}
