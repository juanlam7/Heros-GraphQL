import { ResolverParent, ResolverContext } from '../../interfaces/interfaces';
import { customDelay } from '../../utils/customDelay';

export const userQueries = {
  me: (_: ResolverParent, __: ResolverParent, context: ResolverContext) => {
    return context.currentUser;
  },
  initCall: async () => {
    return customDelay(1000, 'Init connection testing');
  },
};
