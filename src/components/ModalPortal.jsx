import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function ModalPortal({ children }) {
  const [mounted, setMounted] = useState(false);
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    setMounted(true);
    const node = document.createElement('div');
    node.style.position = 'fixed';
    node.style.top = '0';
    node.style.left = '0';
    node.style.width = '100%';
    node.style.height = '100%';
    node.style.zIndex = '2147483647';
    node.style.display = 'flex';
    node.style.justifyContent = 'center';
    node.style.alignItems = 'flex-start';
    node.style.pointerEvents = 'none';
    
    document.body.appendChild(node);
    setPortalNode(node);
    
    return () => {
      if (document.body.contains(node)) {
        document.body.removeChild(node);
      }
    };
  }, []);

  if (!mounted || !portalNode) return null;
  
  return ReactDOM.createPortal(
    <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
      {children}
    </div>,
    portalNode
  );
}
