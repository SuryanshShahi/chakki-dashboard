import { getAllowedTypes } from '@/app/utils/constants';
import { CloudUploadIcon, DeleteIcon, JpegFileIcon } from '@/app/utils/svgs';
import React, { useCallback, useEffect, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

interface DropzoneProps {
  name: string;
  error?: boolean;
  isMultiple?: boolean;
  onChange?: (files: File[]) => void;
  isFilePreview?: boolean;
  resolution?: {
    height: number;
    width: number;
  };
  allowedFileTypes: string[];
  containerClass?: string;
  [key: string]: any;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  name,
  error,
  isMultiple = false,
  onChange = () => {},
  allowedFileTypes,
  isFilePreview = false,
  resolution,
  containerClass,
  ...rest
}) => {
  const fileTypes = getAllowedTypes(allowedFileTypes);
  const [documents, setDocuments] = useState<File[]>([]);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: fileTypes ? fileTypes.types : undefined,
  });

  const handleUpload = () => {
    setDocuments((prev) => {
      const uniqueFiles = getUniqueFiles(prev, acceptedFiles);
      onChange(uniqueFiles);
      // if (isFilePreview) onChange(uniqueFiles);
      return uniqueFiles;
    });
  };

  const getUniqueFiles = (
    prevFiles: File[],
    acceptedFiles: readonly FileWithPath[]
  ) => {
    const uniqueFiles = [...prevFiles];

    acceptedFiles.forEach((file) => {
      if (!isFileDuplicate(uniqueFiles, file)) {
        uniqueFiles.push(file);
      }
    });

    return uniqueFiles;
  };

  const isFileDuplicate = (uniqueFiles: File[], file: File) => {
    return uniqueFiles.some(
      (f) =>
        f.name === file.name &&
        f.size === file.size &&
        f.lastModified === file.lastModified
    );
  };

  const handleRemove = useCallback(
    (fileToRemove: File) => {
      setDocuments((prev) => {
        const updatedFiles = removeFile(prev, fileToRemove);
        onChange(updatedFiles);
        // if (isFilePreview) onChange(updatedFiles);
        return updatedFiles;
      });
    },
    [isFilePreview, onChange]
  );

  const removeFile = (files: File[], fileToRemove: File): File[] => {
    return files.filter((file) => !isSameFile(file, fileToRemove));
  };

  const isSameFile = (file: File, fileToCompare: File): boolean => {
    return (
      file.name === fileToCompare.name &&
      file.size === fileToCompare.size &&
      file.lastModified === fileToCompare.lastModified
    );
  };

  useEffect(() => {
    handleUpload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  return (
    <div className={`space-y-4 w-full ${containerClass}`}>
      <div
        className={`bg-primary w-full h-full rounded-2xl border border-secondary p-4 ${
          error ? '!border-error' : ''
        }`}
        {...getRootProps({ onClick: (e) => e.preventDefault() })}
      >
        <div className='bg-primary flex flex-col space-y-3 justify-center items-center h-full rounded-2xl'>
          <div className='h-10 w-10 p-2 bg-primary border border-secondary rounded-xl'>
            <CloudUploadIcon />
          </div>
          <div className='space-y-1'>
            <p className='text-tertiary text-sm font-normal leading-5 px-8 md:px-0 text-center '>
              <span className='text-btn-tertiary-color-fg text-sm font-semibold leading-5'>
                Click to upload
              </span>{' '}
              or drag and drop
            </p>
            <p className='text-tertiary text-sm font-normal leading-5 text-center'>
              {fileTypes
                ? fileTypes.displayNames.map((item: string, index: number) => {
                    const isLast = index === fileTypes.displayNames.length - 1;
                    return (
                      <React.Fragment key={item}>
                        {item}
                        {isLast
                          ? ''
                          : index === fileTypes.displayNames.length - 2
                          ? ' and '
                          : ', '}
                      </React.Fragment>
                    );
                  })
                : null}
              {resolution && `(${resolution.width} x ${resolution.height} px)`}
            </p>
          </div>
          <input
            type='file'
            name={name}
            multiple={isMultiple}
            {...getInputProps()}
            {...rest}
          />
        </div>
      </div>
      {isFilePreview && (
        <div className='space-y-3'>
          {documents.map((file: File) => {
            const fileSize = (file.size / (1024 * 1024)).toFixed(2);
            return (
              <div
                className='bg-primary w-full h-full rounded-xl border border-secondary px-4 py-3'
                key={file.name}
              >
                <div className='flex justify-between items-center gap-4'>
                  <div className='flex gap-6 items-center'>
                    <JpegFileIcon />
                    <div className='flex-1'>
                      <div className='text-tertiary text-sm font-medium leading-5 w-full truncate'>
                        {file.name}
                      </div>
                      <div className='text-tertiary text-sm font-medium leading-5 w-full truncate'>
                        {Number(fileSize) >= 1
                          ? `${fileSize} MB`
                          : `${Number(fileSize) * 1024} KB`}
                      </div>
                    </div>
                  </div>
                  <DeleteIcon
                    onClick={() => handleRemove(file)}
                    className='cursor-pointer'
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
