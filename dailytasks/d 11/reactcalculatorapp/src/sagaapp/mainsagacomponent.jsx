import React from 'react';
import ReadWriteComponent from './views/readwritecomponent';
import ListDataComponent from './views/listdatacomponent';
const MainSagaComponent=()=>{
    return(
        <div className="container">
          <ReadWriteComponent></ReadWriteComponent>
          <hr/>
          <ListDataComponent></ListDataComponent>
        </div>
    );
};

export default MainSagaComponent;