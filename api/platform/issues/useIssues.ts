import { useContextApi } from '@/api/ApiContext';
import { Issue, IssueType } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useIssues = (type: IssueType) => {
  // context
  const api = useContextApi();
  // state
  const [issues, setIssues] = useState<Issue[]>();
  // side effects
  useEffect(() => {
    (async () => {
      setIssues(await api.platform().fetchIssues(type));
    })();
  }, [api, type]);
  // result
  return issues;
};
