import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function JsonMirrorArea(props) {
  return (
    <CodeMirror
      value={props.value}
      editable={props.editable}
      extensions={[json()]}
      onChange={props.onChange}
    />
  );
}
