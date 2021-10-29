import { useState } from 'react';
export function doComputation() {
  const [errors, setErrors] = useState('');
  const generate = (data) => {
    var parser = new DOMParser();
    var html = parser.parseFromString(data, 'text/html');
    const table = html.getElementsByTagName('table');
    const table_heading_content = html.getElementsByTagName('th');
    const table_data_content = html.getElementsByTagName('td');
    // Generating heading markdown
    if (
      table.length != 0 &&
      table_heading_content.length != 0 &&
      table_data_content.length != 0
    ) {
      let pipe_string = '';
      for (let i = 0; i < table_heading_content.length; i++) {
        const heading = table_heading_content[i].innerText;
        pipe_string += '|' + heading;
      }
      pipe_string += '|\n';
      // Done with heading###########

      // Generating Dividers
      for (let i = 0; i < table_heading_content.length; i++) {
        pipe_string += '|-';
      }
      pipe_string += '|\n';
      // Done with Dividors##########

      // Genearting body
      const loop_count =
        table_data_content.length / table_heading_content.length;
      for (let i = 0; i < loop_count; i++) {
        for (
          let j = i * table_heading_content.length;
          j < table_heading_content.length * (i + 1);
          j++
        ) {
          if (!table_data_content[j]) {
            pipe_string += '|' + ' ';
            break;
          }
          const content = table_data_content[j].innerText;
          pipe_string += '|' + content;
        }
        pipe_string += '|\n';
      }
      // Done body

      if (table.length == 0) {
        setErrors('oooops');
      } else {
        setErrors('');
      }
      return pipe_string;
    } else {
      return "Warning!!!! Use standard table format with\n<table>\n\t<th>\n\t\t<td></td>\n\t</th>\n</table> format.'";
    }
  };
  return { generate, errors };
}
