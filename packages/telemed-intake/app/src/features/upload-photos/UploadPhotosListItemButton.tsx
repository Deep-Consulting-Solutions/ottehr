import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined';
import { FC } from 'react';
import { filterObject, StyledListItemWithButton } from 'ottehr-components';
import { FileURLs } from 'ottehr-utils';
import { useGetPaperwork } from '../paperwork';
import { useTheme } from '@mui/system';

type UploadPhotosListItemButtonProps = {
  onClick: () => void;
  hideText: boolean;
};

export const UploadPhotosListItemButton: FC<UploadPhotosListItemButtonProps> = ({ onClick, hideText }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { data: paperworkData, isLoading, isFetching } = useGetPaperwork(() => {}, { staleTime: 60000 });
  const theme = useTheme();
  const photos = paperworkData
    ? (filterObject(paperworkData.files || {}, (key) => key.startsWith('patient-photos')) as FileURLs)
    : {};

  return (
    <StyledListItemWithButton
      primaryText="Upload photos"
      secondaryText={
        isLoading || isFetching
          ? 'Loading...'
          : Object.keys(photos).length > 0
            ? `${Object.keys(photos).length} photos attached`
            : 'No photos uploaded'
      }
      hideText={hideText}
      onClick={onClick}
    >
      <PhotoLibraryOutlinedIcon sx={{ color: theme.palette.primary.main }} />
    </StyledListItemWithButton>
  );
};
