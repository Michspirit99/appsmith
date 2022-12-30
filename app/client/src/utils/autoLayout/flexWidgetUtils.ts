export function getRightColumn(widget: any, isMobile: boolean): number {
  return isMobile && widget.mobileRightColumn !== undefined
    ? widget.mobileRightColumn
    : widget.rightColumn;
}

export function setRightColumn(
  widget: any,
  val: number,
  isMobile: boolean,
): any {
  if (isNaN(val)) return widget;
  return isMobile && widget.mobileRightColumn !== undefined
    ? { ...widget, mobileRightColumn: val }
    : { ...widget, rightColumn: val };
}

export function getLeftColumn(widget: any, isMobile: boolean): number {
  return isMobile && widget.mobileLeftColumn !== undefined
    ? widget.mobileLeftColumn
    : widget.leftColumn;
}

export function setLeftColumn(
  widget: any,
  val: number,
  isMobile: boolean,
): any {
  if (isNaN(val)) return widget;
  return isMobile && widget.mobileLeftColumn !== undefined
    ? { ...widget, mobileLeftColumn: val }
    : { ...widget, leftColumn: val };
}

export function getTopRow(widget: any, isMobile: boolean): number {
  return isMobile && widget.mobileTopRow !== undefined
    ? widget.mobileTopRow
    : widget.topRow;
}

export function setTopRow(widget: any, val: number, isMobile: boolean): any {
  if (isNaN(val)) return widget;
  return isMobile && widget.mobileTopRow !== undefined
    ? { ...widget, mobileTopRow: val }
    : { ...widget, topRow: val };
}

export function getBottomRow(widget: any, isMobile: boolean): number {
  return isMobile && widget.mobileBottomRow !== undefined
    ? widget.mobileBottomRow
    : widget.bottomRow;
}

export function setBottomRow(widget: any, val: number, isMobile: boolean): any {
  if (isNaN(val)) return widget;
  return isMobile && widget.mobileBottomRow !== undefined
    ? { ...widget, mobileBottomRow: val }
    : { ...widget, bottomRow: val };
}

export function setColumns(
  widget: any,
  left: number,
  right: number,
  isMobile: boolean,
) {
  return setRightColumn(setLeftColumn(widget, left, isMobile), right, isMobile);
}

export function setDimensions(
  widget: any,
  top: number,
  bottom: number,
  left: number,
  right: number,
  isMobile: boolean,
) {
  try {
    return setBottomRow(
      setTopRow(
        setLeftColumn(setRightColumn(widget, right, isMobile), left, isMobile),
        top,
        isMobile,
      ),
      bottom,
      isMobile,
    );
  } catch (e) {
    console.log(e);
    return widget;
  }
}

export function getWidgetWidth(widget: any, isMobile: boolean): number {
  return getRightColumn(widget, isMobile) - getLeftColumn(widget, isMobile);
}

export function getWidgetHeight(widget: any, isMobile: boolean): number {
  return getBottomRow(widget, isMobile) - getTopRow(widget, isMobile);
}
