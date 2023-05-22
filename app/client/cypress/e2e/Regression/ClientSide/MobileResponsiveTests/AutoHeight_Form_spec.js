import { WIDGET_PADDING } from "../../../../../src/constants/WidgetConstants";
import {
  MOBILE_ROW_GAP,
  ROW_GAP,
} from "../../../../../src/utils/autoLayout/constants";
const commonlocators = require("../../../../locators/commonlocators.json");

let childHeight = 0;
let containerHeight = 0;
let inputHeight = 0;
describe("validate auto height for form widget on auto layout canvas", () => {
  it("form widget height should update on adding or deleting child widgets", () => {
    /**
     * Convert app to AutoLayout
     */
    cy.get(commonlocators.autoConvert).click({
      force: true,
    });
    cy.wait(2000);
    cy.get(commonlocators.convert).click({
      force: true,
    });
    cy.wait(2000);
    cy.get(commonlocators.refreshApp).click({
      force: true,
    });
    cy.wait(2000);
    /**
     * Add widget.
     */
    cy.dragAndDropToCanvas("formwidget", { x: 100, y: 200 });
    cy.get(".t--widget-formwidget")
      .invoke("css", "height")
      .then((height) => {
        containerHeight = parseInt(height?.split("px")[0]);
      });

    // add an input widget to the container.
    cy.dragAndDropToWidget("inputwidgetv2", "formwidget", {
      x: 100,
      y: 10,
    });

    cy.get(".t--widget-inputwidgetv2")
      .invoke("css", "height")
      .then((height) => {
        childHeight += parseInt(height?.split("px")[0]);
        inputHeight = parseInt(height?.split("px")[0]);
      });
    cy.get(".t--widget-formwidget")
      .invoke("css", "height")
      .then((newHeight) => {
        const updatedHeight = parseInt(newHeight?.split("px")[0]);
        expect(updatedHeight).to.be.greaterThan(containerHeight);
        expect(updatedHeight).to.equal(
          childHeight + containerHeight + WIDGET_PADDING + ROW_GAP,
        );
        containerHeight = updatedHeight;
      });

    // Add a child Table widget to the container.
    cy.dragAndDropToWidget("tablewidgetv2", "formwidget", {
      x: 100,
      y: 76,
    });
    cy.wait(1000);
    cy.get(".t--widget-tablewidgetv2")
      .invoke("css", "height")
      .then((height) => {
        childHeight += parseInt(height?.split("px")[0]);
      });
    cy.get(".t--widget-formwidget")
      .invoke("css", "height")
      .then((newHeight) => {
        const updatedHeight = parseInt(newHeight?.split("px")[0]);
        expect(updatedHeight).to.be.greaterThan(containerHeight);
        containerHeight = updatedHeight;
      });

    // Delete table widget
    cy.openPropertyPane("tablewidgetv2");
    cy.wait(1000);
    cy.get("[data-testid='t--delete-widget']").click({ force: true });
    cy.wait(1000);
    cy.get(".t--widget-formwidget")
      .invoke("css", "height")
      .then((newHeight) => {
        const updatedHeight = parseInt(newHeight?.split("px")[0]);
        expect(updatedHeight).to.be.lessThan(containerHeight);
        containerHeight = updatedHeight;
      });
  });

  it("form widget should update height upon flex wrap on mobile viewport", () => {
    // add an input widget to the container.
    cy.dragAndDropToWidget("inputwidgetv2", "formwidget", {
      x: 50,
      y: 40,
    });
    cy.wait(1000);
    cy.get(".t--widget-formwidget")
      .invoke("css", "height")
      .then((newHeight) => {
        const updatedHeight = parseInt(newHeight?.split("px")[0]);
        expect(updatedHeight).to.equal(containerHeight);
      });

    // Switch to mobile viewport
    cy.get("#canvas-viewport").invoke("width", `400px`);
    cy.wait(2000);
    cy.get(".t--widget-formwidget")
      .invoke("css", "height")
      .then((newHeight) => {
        const updatedHeight = parseInt(newHeight?.split("px")[0]);
        // Flex wrap would lead to creation of a new row.
        const numOfRowsAdded = 1;
        // Row gap is 8px on mobile viewport (< row gap on desktop).
        const rowGapDiff = ROW_GAP - MOBILE_ROW_GAP;
        const originalRows = 2;
        const totalRowGapDiff = rowGapDiff * originalRows;
        expect(updatedHeight).to.be.greaterThan(containerHeight);
        expect(updatedHeight).to.equal(
          containerHeight +
            inputHeight +
            WIDGET_PADDING +
            numOfRowsAdded * MOBILE_ROW_GAP -
            totalRowGapDiff,
        );
      });
  });
});
