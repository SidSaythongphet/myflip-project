import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState()

  useEffect(() => {
    fetch("/api/")
      .then((r) => r.json())
      .then((data) => setTitle(data.server));
  }, []);


  return (
    <div>
      { title }
    </div>
  );
}

export default App;
