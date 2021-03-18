import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const AppLink: React.FC<any> = (props) => {
  const router = useRouter();

  let className = props.className || '';
  if (router.pathname === props.href) {
    className = `${className} selected`;
  }

  return (
    <Link href={props.href}>
      {React.cloneElement(props.children, { className })}
    </Link>
  );
};
