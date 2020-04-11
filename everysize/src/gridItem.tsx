import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  height: 25px;
  background: none;
  border: none;
  border-bottom: white 1px solid;
  color: white;
  padding-left: 8px;
  padding-right: 8px;
  width: 30px;
  text-align: center;
`;

interface IStyledGridItemProps {
  width: number;
}

const StyledGridItem = styled.div<IStyledGridItemProps> `
  width: ${(props: IStyledGridItemProps): string => `${props.width}px`};
  background-color: #333333;
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const GridItemTitle = styled.div`
  height: 50px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: space-around;
  align-items: center;
`;

interface IGridItemChildrenHolderProps {
  height: number;
  width: number;
}

const GridItemChildrenHolder = styled.div<IGridItemChildrenHolderProps>`
  height: ${(props: IGridItemChildrenHolderProps): string => `${props.height}px`};
  width: ${(props: IGridItemChildrenHolderProps): string => `${props.width}px`};
`;

interface IGridItemProps {
  initialHeight: number;
  initialWidth: number;
  children: React.ReactChild | React.ReactChild[];
}

export const GridItem = (props: IGridItemProps): React.ReactElement => {
  const [height, setHeight] = React.useState<number>(props.initialHeight);
  const [width, setWidth] = React.useState<number>(props.initialWidth);

  const onHeightInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHeight(Number(event.target.value));
  };

  const onWidthInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWidth(Number(event.target.value));
  };

  return (
    <StyledGridItem
      width={width}
    >
      <GridItemTitle>
        <div>size: <StyledInput value={width || '0'} onChange={onWidthInputChanged} /> x <StyledInput value={height || '0'} onChange={onHeightInputChanged} /></div>
      </GridItemTitle>
      <GridItemChildrenHolder
        width={width}
        height={height}
      >
        { props.children }
      </GridItemChildrenHolder>
    </StyledGridItem>
  );
}

GridItem.defaultProps = {
  initialHeight: 100,
  initialWidth: 100,
};
