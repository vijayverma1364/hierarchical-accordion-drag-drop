import React, { useCallback, useEffect, useRef, useState } from "react";
import TreeView from "devextreme-react/tree-view";
import Sortable from "devextreme-react/sortable";
import service from "../../data/json-data/data";
import Button from "../../components/common/button/button";
import { SearchPanel } from "devextreme-react/tree-list";

const calculateToIndex = (e) => {
  if (e.fromComponent !== e.toComponent || e.dropInsideItem) {
    return e.toIndex;
  }
  return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
};

const findNode = (treeView, index) => {
  const nodeElement = treeView.element().querySelectorAll(".dx-treeview-node")[
    index
  ];
  if (nodeElement) {
    return findNodeById(
      treeView.getNodes(),
      nodeElement.getAttribute("data-item-id")
    );
  }
  return null;
};

const findNodeById = (nodes, id) => {
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].itemData.id === id) {
      return nodes[i];
    }
    if (nodes[i].children) {
      const node = findNodeById(nodes[i].children, id);
      if (node != null) {
        return node;
      }
    }
  }
  return null;
};

const moveNode = (fromNode, toNode, fromItems, toItems, isDropInsideItem) => {
  const fromNodeContainingArray = getNodeContainingArray(fromNode, fromItems);
  const fromIndex = fromNodeContainingArray.findIndex(
    (item) => item.id === fromNode.itemData.id
  );
  fromNodeContainingArray.splice(fromIndex, 1);
  if (isDropInsideItem) {
    toNode.itemData.items.splice(
      toNode.itemData.items.length,
      0,
      fromNode.itemData
    );
  } else {
    const toNodeContainingArray = getNodeContainingArray(toNode, toItems);
    const toIndex =
      toNode === null
        ? toNodeContainingArray.length
        : toNodeContainingArray.findIndex(
          (item) => item.id === toNode.itemData.id
        );
    toNodeContainingArray.splice(toIndex, 0, fromNode.itemData);
  }
};

const getNodeContainingArray = (node, rootArray) =>
  node === null || node.parent === null
    ? rootArray
    : node.parent.itemData.items;
const isChildNode = (parentNode, childNode) => {
  let { parent } = childNode;
  while (parent !== null) {
    if (parent.itemData.id === parentNode.itemData.id) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
};

const getTopVisibleNode = (component) => {
  const treeViewElement = component.element();
  const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
  const nodes = treeViewElement.querySelectorAll(".dx-treeview-node");
  for (let i = 0; i < nodes.length; i += 1) {
    const nodeTopPosition = nodes[i].getBoundingClientRect().top;
    if (nodeTopPosition >= treeViewTopPosition) {
      return nodes[i];
    }
  }
  return null;
};

const DragNew = () => {
  const treeViewDriveCRef = useRef(null);
  const treeViewDriveDRef = useRef(null);

  const [itemsDriveC, setItemsDriveC] = useState(service.getItemsDriveC());
  const [itemsDriveD, setItemsDriveD] = useState(service.getItemsDriveD());

  const getTreeView = useCallback(
    (driveName) =>
      driveName === "driveC"
        ? treeViewDriveCRef.current.instance()
        : treeViewDriveDRef.current.instance(),
    []
  );
  const onDragChange = useCallback(
    (e) => {
      if (e.fromComponent === e.toComponent) {
        const fromNode = findNode(getTreeView(e.fromData), e.fromIndex);
        const toNode = findNode(getTreeView(e.toData), calculateToIndex(e));
        if (toNode !== null && isChildNode(fromNode, toNode)) {
          e.cancel = true;
        }
      }
    },
    [getTreeView]
  );
  const getStateFieldItems = useCallback(
    (driveName) => (driveName === "driveC" ? itemsDriveC : itemsDriveD),
    [itemsDriveC, itemsDriveD]
  );
  const onDragEnd = useCallback(
    (e) => {
      if (e.fromComponent === e.toComponent && e.fromIndex === e.toIndex) {
        return;
      }
      const fromTreeView = getTreeView(e.fromData);
      const toTreeView = getTreeView(e.toData);
      const fromNode = findNode(fromTreeView, e.fromIndex);
      const toNode = findNode(toTreeView, calculateToIndex(e));
      if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
        return;
      }
      const fromTopVisibleNode = getTopVisibleNode(e.fromComponent);
      const toTopVisibleNode = getTopVisibleNode(e.toComponent);
      const fromItems = getStateFieldItems(e.fromData);
      const toItems = getStateFieldItems(e.toData);
      moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);
      setItemsDriveC([...fromItems]);
      setItemsDriveD([...toItems]);
      fromTreeView.scrollToItem(fromTopVisibleNode);
      toTreeView.scrollToItem(toTopVisibleNode);
    },
    [getTreeView, getStateFieldItems]
  );

  console.log(33333, treeViewDriveCRef)
  const clickToExpandAll = () => {
    if (treeViewDriveCRef.current) {
      treeViewDriveCRef.current.instance?.expandAll();
    }
  };

  const clickToCollapseAll = () => {
    if (treeViewDriveCRef.current) {
      treeViewDriveCRef.current.instance?.collapseAll();
    }
  };

  return (
    <div className="form drag-wrapper-2">
      <div className="filter-row">
        <div className="filter-btns">
          <Button label="Expand All" onClick={clickToExpandAll} />
          <Button label="Collapse All" onClick={clickToCollapseAll} />
        </div>
      </div>

      <div className="drive-panel">
        <Sortable
          filter=".dx-treeview-item"
          group="shared"
          data="driveC"
          allowDropInsideItem={true}
          allowReordering={true}
          onDragChange={onDragChange}
          onDragEnd={onDragEnd}

        >
          <TreeView
            id="treeviewDriveC"
            expandNodesRecursive={false}
            dataStructure="tree"
            ref={treeViewDriveCRef}
            items={itemsDriveC}
            displayExpr="name"
            searchEnabled={true}
            searchMode="contains"
            expandAllEnabled={true}
            animationEnabled={true}

          />
        </Sortable>
      </div>
    </div>
  );
};
export default DragNew;
