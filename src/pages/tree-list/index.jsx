import React, { useState, useEffect, useRef, useCallback } from "react";
import { TreeList, Column, SearchPanel } from "devextreme-react/tree-list";
import "devextreme/dist/css/dx.light.css";
import { treeViewList } from "../../data/json-data";
import Button from "../../components/common/button/button";

const TreeView = () => {
  const [treeList, setTreeList] = useState(treeViewList || []);
  const treeListRef = useRef(null);
  console.log(1111, treeListRef);

  const expandAll = () => {
    if (treeListRef.current) {
      treeListRef.current.instance?.expandAll();
    }
  };

  const collapseAll = () => {
    if (treeListRef.current) {
      treeListRef.current.instance?.collapseAll();
    }
  };

  const onReorder = useCallback(
    (e) => {
      const visibleRows = e.component.getVisibleRows();
      let sourceData = e.itemData;
      const updatedEmployees = [...treeList];
      const sourceIndex = updatedEmployees.indexOf(sourceData);

      if (e.dropInsideItem) {
        sourceData = { ...sourceData, Head_ID: visibleRows[e.toIndex].key };
        updatedEmployees.splice(sourceIndex, 1);
        updatedEmployees.splice(e.toIndex, 0, sourceData);
      } else {
        const toIndex = e.fromIndex > e.toIndex ? e.toIndex - 1 : e.toIndex;
        let targetData = toIndex >= 0 ? visibleRows[toIndex].node.data : null;

        if (targetData && e.component.isRowExpanded(targetData.ID)) {
          sourceData = { ...sourceData, Head_ID: targetData.ID };
          targetData = null;
        } else {
          const headId = targetData ? targetData.Head_ID : -1;
          if (sourceData.Head_ID !== headId) {
            sourceData = { ...sourceData, Head_ID: headId };
          }
        }

        updatedEmployees.splice(sourceIndex, 1);
        const targetIndex = updatedEmployees.indexOf(targetData) + 1;
        updatedEmployees.splice(targetIndex, 0, sourceData);
      }

      setTreeList(updatedEmployees);
    },
    [treeList]
  );

  const onDragChange = (e) => {
    const visibleRows = e.component.getVisibleRows();
    const sourceNode = e.component.getNodeByKey(e.itemData.ID);
    let targetNode = visibleRows[e.toIndex].node;

    while (targetNode && targetNode.data) {
      if (targetNode.data.ID === sourceNode.data.ID) {
        e.cancel = true;
        break;
      }
      targetNode = targetNode.parent;
    }
  };

  // useEffect(() => {
  //   document.addEventListener("click", handleAddClass);
  //   return () => document.removeEventListener("click", handleAddClass);
  // }, []);

  // const handleAddClass = () => {
  //   debugger;
  //   const ele = document.querySelectorAll(
  //     ".dx-treeview-node-container-opened li"
  //   );
  //   debugger;
  //   if (ele?.length) {
  //     ele[ele.length].classList.add("my-class");
  //   }
  //   console.log(11, ele);
  // };

  return (
    <div className="drag-wrapper">
      <div className="filter-row">
        <div className="filter-btns">
          <Button label="Expand All" onClick={expandAll} />
          <Button label="Collapse All" onClick={collapseAll} />
        </div>
      </div>

      <TreeList
        ref={treeListRef}
        id="treeList"
        dataSource={treeList}
        rootValue={-1}
        keyExpr="ID"
        showRowLines={true}
        showBorders={true}
        parentIdExpr="Head_ID"
        defaultExpandedRowKeys={[1]}
        dataStructure="plain"
        columnAutoWidth={true}
        rowDragging={{
          allowReordering: true,
          showDragIcons: true,
          allowDropInsideItem: true,
          onReorder: onReorder,
          onDragChange: onDragChange,
        }}
        className="tree-wrapper"
      >
        <SearchPanel visible={true} width={250} className="tree-search" />
        <Column dataField="name" id="test_id" className="treeList-name" />
      </TreeList>
    </div>
  );
};

export default TreeView;
