import {
  Button,
  Container,
  render,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";

import { InsertCodeHandler } from "./types";

function Plugin() {
  async function handleInsertCodeButtonClick() {
    emit<InsertCodeHandler>("INSERT_CODE");
  }

  return (
    <Container space="medium">
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        Insert Text Styles
      </Button>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
