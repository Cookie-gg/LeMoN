import { memo, useEffect, useState } from 'react';
import mermaid from 'mermaid';
import parse from 'html-react-parser';

mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'strict',
  maxTextSize: 100000,
  logLevel: process.env.NODE_ENV !== 'production' ? 4 : 1,
});

function Mermaid({ chart }: { chart: string }) {
  const [diagram, _diagram] = useState('');
  useEffect(() => {
    if (typeof document !== undefined) {
      _diagram(mermaid.render(`mermaid_id_${Math.floor(Math.random() * 10000)}`, chart));
    }
  }, [chart]);
  return <div className="mermaid_widget">{parse(diagram)}</div>;
}

export default memo(Mermaid);
