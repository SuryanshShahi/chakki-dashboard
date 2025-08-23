interface NameInitialProps {
  name?: string;
  type?: 'drop_menu_list' | 'drop_menu_selected_chip';
}

const NameInitial: React.FC<NameInitialProps> = ({ name = 'O', type = '' }) => {
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  switch (type) {
    case 'drop_menu_list':
      return (
        <span className='flex items-center text-sm font-semibold justify-center p-2 h-8 w-8 bg-utility-gray-100 rounded-full'>
          {getInitials(name)}
        </span>
      );
    case 'drop_menu_selected_chip':
      return (
        <span className='flex items-center text-xs font-semibold justify-center  w-6 h-6 bg-utility-gray-100 rounded-full'>
          {getInitials(name)}
        </span>
      );
    default:
      return (
        <span className='flex items-center font-satoshi font-semibold justify-center p-2 h-7 w-7 bg-utility-gray-100 rounded-full'>
          {getInitials(name)}
        </span>
      );
  }
};

export default NameInitial;
