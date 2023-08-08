import axios from 'axios';
import { parse } from 'marked';
import { useEffect, useState } from 'react';

export const useMarkdown = (url: string, fallback?: string) => {
  // state
  const [text, setText] = useState<string>();
  const [markdown, setMarkdown] = useState<string>();
  // side effects
  // load online terms
  useEffect(() => {
    axios
      .get<string>(url)
      .then((response) => {
        setText(response.data);
      })
      .catch((error) => {
        console.error(error);
        if (fallback) setText(fallback);
      });
  }, [url, fallback]);
  useEffect(() => {
    if (text) setMarkdown(parse(text));
  }, [text]);
  // result
  return markdown;
};
