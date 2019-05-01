read -p "Component Name: " Name
UpperName=${Name^}
touch src/components/${UpperName}.jsx
echo "import React from 'react';

function ${UpperName}(){

  return(
    <div>

    </div>
  )
}

export default ${UpperName};" > ${UpperName}.jsx
