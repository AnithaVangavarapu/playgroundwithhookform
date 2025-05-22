import { useEffect, useState } from "react";
import { TextInput } from "../../commonComponents";
const InsulineDiary = () => {
  const [name, setName] = useState("test");
  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <div>
      <TextInput name="Name" onChange={setName} value={name} />
    </div>
  );
};

export default InsulineDiary;
