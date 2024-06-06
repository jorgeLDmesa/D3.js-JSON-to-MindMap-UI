import React, { useState } from 'react';
import Sheet from '../Sheet';
import FormSection from '../FormSection_';
import MindMap from '../MindMap'; // Importar el nuevo componente
import './Home.css'; // Importación del archivo CSS

const Home = () => {
  const [mindMapData, setMindMapData] = useState(null);

  return (
    <div className="sheet-container">
      <Sheet className="long-sheet">
        <FormSection onGenerate={setMindMapData} />
      </Sheet>
      <Sheet className="wide-sheet"> {/* Actualizar la clase para una hoja más ancha */}
        {mindMapData && <MindMap data={mindMapData} />} {/* Incrustar el componente MindMap aquí */}
      </Sheet>
    </div>
  );
};

export default Home;



