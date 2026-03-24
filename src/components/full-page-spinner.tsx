import { Spinner } from './spinner';

export const FullPageSpinner = () => {
  return (
    <div className={'fixed flex h-full w-full items-center justify-center'}>
      <Spinner kind={'primary'} size={'sm'} visible={true} />
    </div>
  );
};
