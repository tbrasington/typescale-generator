import {
  Button,
  Container,
  render,
  VerticalSpace,
  FileUploadButton,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";

import { InsertCodeHandler } from "./types";

function Plugin() {
  async function handleSelectedFiles(files: Array<File>) {
    console.log({ evt: files });

    const reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = async () => {
      const json = JSON.parse(reader.result as string);

      emit("INSERT_FILE", json);
    };
  }

  return (
    <Container space="medium">
      <FileUploadButton onSelectedFiles={handleSelectedFiles}>
        Upload design tokens file
      </FileUploadButton>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
