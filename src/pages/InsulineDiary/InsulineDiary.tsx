import { useEffect, useState } from "react";
import { TextInput } from "../../commonComponents";
const InsulineDiary = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <div>
      <TextInput name="Name" value={name} onChange={setName} />
    </div>
  );
};

export default InsulineDiary;
