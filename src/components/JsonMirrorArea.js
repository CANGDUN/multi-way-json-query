import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';

export default function JsonMirrorArea(props) {
  const { value, editable, readOnly, onChange, height } = props;

  return (
    <CodeMirror
      className="font-mono"
      value={value}
      editable={editable}
      readOnly={readOnly}
      extensions={[json()]}
      onChange={onChange}
      height={height}
      maxWidth="100%"
    />
  );
}
