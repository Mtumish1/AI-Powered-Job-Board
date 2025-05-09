import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BaseProps {
  children: React.ReactNode;
  color?: 'orange' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface ButtonProps extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface LinkProps extends BaseProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
}

type GlowingButtonProps = ButtonProps | LinkProps;

const GlowingButton: React.FC<GlowingButtonProps> = ({ 
  children, 
  color = 'orange', 
  size = 'md',
  className = '',
  ...props
}) => {
  const colorVariants = {
    orange: {
      bg: 'bg-orange-500',
      hoverBg: 'hover:bg-orange-400',
      glow: 'from-orange-500/50 to-orange-500/0',
      hoverGlow: 'group-hover:from-orange-500/70 group-hover:to-orange-500/0'
    },
    blue: {
      bg: 'bg-blue-500',
      hoverBg: 'hover:bg-blue-400',
      glow: 'from-blue-500/50 to-blue-500/0',
      hoverGlow: 'group-hover:from-blue-500/70 group-hover:to-blue-500/0'
    }
  };

  const sizeVariants = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = `group relative inline-flex items-center justify-center font-medium rounded-lg text-white transition-all duration-200 ${colorVariants[color].bg} ${colorVariants[color].hoverBg} ${sizeVariants[size]} ${className}`;

  const glowEffect = (
    <motion.span 
      className={`absolute inset-0 w-full h-full rounded-lg bg-gradient-radial blur-xl -z-10 opacity-70 transition-opacity duration-300 ${colorVariants[color].glow} ${colorVariants[color].hoverGlow}`}
      initial={{ scale: 0.85, opacity: 0 }}
      whileHover={{ scale: 1.05, opacity: 1 }}
    />
  );

  // Check if it's a link or button
  if ('href' in props) {
    const { href, ...rest } = props;
    
    // External link
    if (href.startsWith('http')) {
      return (
        <a href={href} className={baseClasses} {...rest}>
          {glowEffect}
          {children}
        </a>
      );
    }
    
    // Internal link (React Router)
    return (
      <Link to={href} className={baseClasses} {...rest}>
        {glowEffect}
        {children}
      </Link>
    );
  }

  // Button
  return (
    <button className={baseClasses} {...props}>
      {glowEffect}
      {children}
    </button>
  );
};

export default GlowingButton;