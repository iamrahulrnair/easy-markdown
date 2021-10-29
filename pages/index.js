import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { doComputation } from '../hooks/doComputation';
import { Spinner } from '../components/Spinner';

export default function Container_1() {
  const [code, setCode] = useState('');
  const [generated_data, setGeneratedData] = useState('Loading....');
  const { generate, errors } = doComputation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setGeneratedData(generate(code));
    }, 2000);
    return () => {
      return clearInterval(timer);
    };
  }, [code]);

  function copyClipboard() {
    navigator.clipboard.writeText(generated_data);
    setGeneratedData('Successfully copied to clipboard!!');
  }

  return (
    <div className={styles.container}>
      <div className={styles.col}>
        <div className={styles.codeEditorBlock}>
          <Editor
            className={styles.codeEditor}
            defaultLanguage="html"
            onChange={(v, e) => setCode(v)}
            theme="vs-dark"
            loading={<Spinner />}
          />
        </div>
      </div>
      <div className={styles.col}>
        <i
          title="click to copy to clipboard"
          onClick={copyClipboard}
          className="fas fa-copy"
        ></i>

        <div className={styles.codeEditorBlock}>
          <Editor
            className={styles.codeEditor}
            defaultLanguage="Markdown"
            value={generated_data}
            theme="vs-dark"
            loading={<Spinner />}
          />
        </div>
      </div>
      <div className="footer">
        <div className="footer-logo">
          <h2>EasyMarkdown</h2>
        </div>
        <div className="footer-foot">
          <a href="https://www.linkedin.com/in/iamrahulrnair/">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://medium.com/@iamrahulrnair">
            <i className="fab fa-medium"></i>
          </a>
          <a href="https://github.com/iamrahulrnair">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
