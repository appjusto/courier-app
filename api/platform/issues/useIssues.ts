import { useContextApi } from '@/api/ApiContext';
import { Issue, IssueType } from '@appjusto/types';
import { useEffect, useState } from 'react';

export const useIssues = (type?: IssueType) => {
  // context
  const api = useContextApi();
  // state
  const [issues, setIssues] = useState<Issue[]>();
  // side effects
  useEffect(() => {
    if (!type) return;
    api.platform().fetchIssues(type).then(setIssues);
  }, [api, type]);
  // result
  return issues;
};
