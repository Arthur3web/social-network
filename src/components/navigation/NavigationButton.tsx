// src/components/navigation/NavigationButton.tsx
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

interface NavigationButtonProps {
  icon: string;
  label: string;
  path: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ icon, label, path }) => {
  return (
    <Link to={path}>
      <Button className="navigation-button" icon={icon}>
        {label}
      </Button>
    </Link>
  );
};

export default NavigationButton;