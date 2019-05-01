read -p "Component Name: " Name
UpperName=${Name^}
touch src/components/${UpperName}.jsx
echo "import React from 'react';

class ${UpperName} extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      //state here//
    }
  }

  render(){
    return(
    <div>

    </div>
    )
  }
}

export default ${UpperName};" > ${UpperName}.jsx
