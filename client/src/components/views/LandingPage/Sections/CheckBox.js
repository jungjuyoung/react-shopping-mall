import React, { useState } from 'react';
import { Checkbox, Collapse } from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  console.log(`Checked: ${JSON.stringify(Checked)}`);

  const handleToggle = (value) => {
    // 누른것의 index를 구하고
    const currentIndex = Checked.indexOf(value);
    console.log(
      `value: ${JSON.stringify(value)} currentIndex: ${JSON.stringify(
        currentIndex
      )}`
    );

    // 전체 checked된 State에서 누른 index의 checked가 이미 있다면 빼주고
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      // 아니면 State에 넣어준다.
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };
  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
