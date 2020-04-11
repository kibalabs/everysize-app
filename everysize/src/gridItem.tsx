import React from 'react';
import styled from 'styled-components';

interface IStyledGridItemProps {
  width: string;
}

const StyledGridItem = styled.div<IStyledGridItemProps> `
width: ${(props: IStyledGridItemProps): string => props.width};
  background-color: #333333;
  display: flex;
  flex-direction: column;
`;

const GridItemTitle = styled.div`
  height: 50px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  color: white;
`;

interface IGridItemChildrenHolderProps {
  height: string;
}


const GridItemChildrenHolder = styled.div<IGridItemChildrenHolderProps>`
  height: ${(props: IGridItemChildrenHolderProps): string => props.height};
`;

interface IGridItemProps {
  initialHeight: string;
  initialWidth: string;
  children: React.ReactChild | React.ReactChild[];
}

export const GridItem = (props: IGridItemProps): React.ReactElement => {
  const [height, setHeight] = React.useState<string>(props.initialHeight);
  const [width, setWidth] = React.useState<string>(props.initialWidth);

  const onHeightInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setHeight(event.target.value);
  };

  const onWidthInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWidth(event.target.value);
  };

  return (
    <StyledGridItem
      width={width}
    >
      <GridItemTitle>
        height: <input value={height || '0'} onChange={onHeightInputChanged}></input>
        width: <input value={width || '0'} onChange={onWidthInputChanged}></input>
      </GridItemTitle>
      <GridItemChildrenHolder
        height={height}
      >
        { props.children }
      </GridItemChildrenHolder>
    </StyledGridItem>
  );
}

GridItem.defaultProps = {
  initialHeight: '100%',
  initialWidth: '100%',
};
