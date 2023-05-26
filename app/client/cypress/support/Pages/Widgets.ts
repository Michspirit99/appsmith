import { ObjectsRegistry } from "../Objects/Registry";

export class Widgets {
  private entityExplorer = ObjectsRegistry.EntityExplorer;
  private propPane = ObjectsRegistry.PropertyPane;

  _buttonWidgetSelector = ".t--widget-buttonwidget";
  _buttonComponentSelector = ".t--widget-buttonwidget button";
  _textWidgetSelector = ".t--widget-textwidget";
  _textComponentSelector = ".t--widget-textwidget .t--text-widget-container";
  _containerWidgetSelector = ".t--widget-containerwidget";

  /**
   * Drag and drop a button widget and verify if the bounding box fits perfectly
   * after adjusting the label length
   *
   * @param {number} x
   * @param {number} y
   * @param {string} [dropTarget=""]
   */
  DropButtonAndTestForAutoDimension(x: number, y: number, dropTarget = "") {
    this.entityExplorer.DragDropWidgetNVerify("buttonwidget", x, y, dropTarget);

    // Check if bounding box fits perfectly to the Button Widget
    this.EnsureBoundingBoxFitsComponent(
      this._buttonWidgetSelector,
      this._buttonComponentSelector,
    );

    // Increase the length of button label & verify if the component expands
    this.GetWidgetWidth(this._buttonWidgetSelector).as("initialWidth");
    this.propPane.UpdatePropertyFieldValue("Label", "Lengthy Button Label");
    this.GetWidgetWidth(this._buttonWidgetSelector).then((width) => {
      cy.get<number>("@initialWidth").then((initialWidth) => {
        expect(width).to.be.greaterThan(initialWidth);
      });
    });

    // verify if the bounding box fits perfectly to the Button Widget after expanding
    this.EnsureBoundingBoxFitsComponent(
      this._buttonWidgetSelector,
      this._buttonComponentSelector,
    );

    // Decrease the length of button label & verify if the component shrinks
    this.GetWidgetWidth(this._buttonWidgetSelector).as("initialWidth");
    this.propPane.UpdatePropertyFieldValue("Label", "Label");
    this.GetWidgetWidth(this._buttonWidgetSelector).then((width) => {
      cy.get<number>("@initialWidth").then((initialWidth) => {
        expect(width).to.be.lessThan(initialWidth);
      });
    });

    // verify if the bounding box fits perfectly to the Button Widget after expanding
    this.EnsureBoundingBoxFitsComponent(
      this._buttonWidgetSelector,
      this._buttonComponentSelector,
    );
  }

  /**
   * Drag and drop a text widget and verify if the bounding box fits perfectly
   * after adding & removing multi-line text
   *
   * @param {number} x
   * @param {number} y
   * @param {string} [dropTarget=""]
   */
  DropTextAndTestForAutoDimension(x: number, y: number, dropTarget = "") {
    this.entityExplorer.DragDropWidgetNVerify("textwidget", x, y, dropTarget);

    // Check if bounding box fits perfectly to the Text Widget
    this.EnsureBoundingBoxFitsComponent(
      this._textWidgetSelector,
      this._textComponentSelector,
    );

    // Add multi-line text & verify if the component's height increases
    this.GetWidgetHeight(this._textWidgetSelector).as("initialHeight");
    this.propPane.UpdatePropertyFieldValue(
      "Text",
      "hello\nWorld\nThis\nis\na\nMulti-line\nText",
    );
    this.GetWidgetHeight(this._textWidgetSelector).then((width) => {
      cy.get<number>("@initialHeight").then((initialHeight) => {
        expect(width).to.be.greaterThan(initialHeight);
      });
    });

    // Check if bounding box fits perfectly to the Text Widget
    this.EnsureBoundingBoxFitsComponent(
      this._textWidgetSelector,
      this._textComponentSelector,
    );

    // Remove some lines & verify if the component's height decreases
    this.GetWidgetHeight(this._textWidgetSelector).as("initialHeight");
    this.propPane.UpdatePropertyFieldValue("Text", "hello\nWorld\nblabla");
    this.GetWidgetHeight(this._textWidgetSelector).then((width) => {
      cy.get<number>("@initialHeight").then((initialWidth) => {
        expect(width).to.be.lessThan(initialWidth);
      });
    });

    // Check if bounding box fits perfectly to the Text Widget
    this.EnsureBoundingBoxFitsComponent(
      this._textWidgetSelector,
      this._textComponentSelector,
    );
  }

  /**
   * Ensures that the bounding box of a widget fits perfectly with the component.
   *
   * @param {string} widgetSelector - Selector for the widget element.
   * @param {string} componentSelector - Selector for the component element.
   * @returns {void}
   */
  EnsureBoundingBoxFitsComponent(
    widgetSelector: string,
    componentSelector: string,
  ) {
    // TODO(aswathkk): Delta should be made 0.5 once the issue with list widget in mobile view is fixed.
    const DELTA = 1;
    cy.get(widgetSelector).then((widget) => {
      const widgetRect = widget.get(0).getBoundingClientRect();
      cy.get(componentSelector).then((component) => {
        const componentRect = component.get(0).getBoundingClientRect();
        expect(widgetRect.x).to.be.closeTo(componentRect.x - 2, DELTA);
        expect(widgetRect.y).to.be.closeTo(componentRect.y - 2, DELTA);
        expect(widgetRect.top).to.be.closeTo(componentRect.top - 2, DELTA);
        expect(widgetRect.bottom).to.be.closeTo(
          componentRect.bottom + 2,
          DELTA,
        );
        expect(widgetRect.left).to.be.closeTo(componentRect.left - 2, DELTA);
        expect(widgetRect.right).to.be.closeTo(componentRect.right + 2, DELTA);
        expect(widgetRect.height).to.be.closeTo(
          componentRect.height + 4,
          DELTA,
        );
        expect(widgetRect.width).to.be.closeTo(componentRect.width + 4, DELTA);
      });
    });
  }

  GetWidgetWidth(widgetSelector: string) {
    return cy.get(widgetSelector).invoke("width");
  }

  GetWidgetHeight(widgetSelector: string) {
    return cy.get(widgetSelector).invoke("height");
  }
}
