import { Tabs } from '@/components/Tabs/Tabs';
import { Discord } from '@/components/illustrations/Discord';
import { MenuKeysEnum } from '@/const/menuKeys';
import {
  TrackingAction,
  TrackingCategory,
  TrackingEventParameter,
} from '@/const/trackingKeys';
import {
  DISCORD_URL,
  JUMPER_BOYCO_PATH,
  JUMPER_LEARN_PATH,
  JUMPER_LOYALTY_PATH,
  JUMPER_SCAN_PATH,
  X_URL,
} from '@/const/urls';
import { useUserTracking } from '@/hooks/userTracking/useUserTracking';
import { useMenuStore } from '@/stores/menu';
import { useThemeStore } from '@/stores/theme';
import { getContrastAlphaColor } from '@/utils/colors';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import LanguageIcon from '@mui/icons-material/Language';
import PetsIcon from '@mui/icons-material/Pets';
import SchoolIcon from '@mui/icons-material/School';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import XIcon from '@mui/icons-material/X';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useThemeSwitchTabs } from './useThemeSwitchTabs';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { BoycoIcon } from 'src/components/illustrations/BoycoIcon';

export const useMainMenuContent = () => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useUserTracking();
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const [themeMode, configTheme] = useThemeStore((state) => [
    state.themeMode,
    state.configTheme,
  ]);
  const { setSupportModalState, setSubMenuState, closeAllMenus } = useMenuStore(
    (state) => state,
  );

  const themeSwitchTabs = useThemeSwitchTabs();

  const containerStyles = {
    display: 'flex',
    width: '100%',
    borderRadius: '24px',
    div: {
      height: 38,
    },
    '.MuiTabs-indicator': {
      height: 38,
      zIndex: -1,
      borderRadius: '18px',
    },
  };

  const tabStyles = {
    height: 38,
    margin: theme.spacing(0.75),
    minWidth: 'unset',
    borderRadius: '18px',
  };

  let mainMenu: any[] = [];

  if (configTheme?.hasThemeModeSwitch) {
    mainMenu.push({
      children: (
        <Tabs
          data={themeSwitchTabs}
          value={themeMode === 'light' ? 0 : themeMode === 'dark' ? 1 : 2}
          ariaLabel="theme-switch-tabs"
          containerStyles={containerStyles}
          tabStyles={tabStyles}
        />
      ),
      styles: {
        width: 'auto',
        margin: theme.spacing(1.5),
        gap: '8px',
        backgroundColor: 'transparent',
        borderRadius: '24px',
        '&:hover': {
          backgroundColor: 'transparent',
        },
        paddingTop: `${theme.spacing(0.5)} !important`,
        padding: theme.spacing(0.5),
        '> button:hover': {
          backgroundColor: getContrastAlphaColor(theme, '4%'),
        },
        '> button:hover svg': {
          fill:
            theme.palette.mode === 'light'
              ? theme.palette.grey[700]
              : theme.palette.grey[300],
        },
      },
      showMoreIcon: false,
      disableRipple: true,
    });
  }

  mainMenu = mainMenu.concat([
    {
      label: t('language.key', { ns: 'language' }),
      prefixIcon: <LanguageIcon />,
      suffixIcon: (
        <Typography
          variant="bodyMedium"
          textTransform={'uppercase'}
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 38,
          }}
        >
          {i18n.language}
        </Typography>
      ),
      showMoreIcon: true,
      triggerSubMenu: MenuKeysEnum.Language,
      onClick: () => {
        setSubMenuState(MenuKeysEnum.Language);
      },
    },
    // {
    //   label: 'Jump into Boyco',
    //   prefixIcon: <BoycoIcon />,
    //   showMoreIcon: false,
    //   link: { url: JUMPER_BOYCO_PATH },
    //   onClick: () => {
    //     trackEvent({
    //       category: TrackingCategory.Menu,
    //       label: 'click-jumper-pass-berachain',
    //       action: TrackingAction.ClickJumperCampaignLink,
    //       data: { [TrackingEventParameter.Menu]: 'berachain' },
    //     });
    //     closeAllMenus();
    //     router.push(JUMPER_BOYCO_PATH);
    //   },
    // },
    {
      label: 'Perfil',
      prefixIcon: <AccountCircleIcon />,
      showMoreIcon: false,
      link: { url: JUMPER_LOYALTY_PATH },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'click-jumper-pass-link',
          action: TrackingAction.ClickJumperProfileLink,
          data: { [TrackingEventParameter.Menu]: 'pass' },
        });
        closeAllMenus();
        router.push(JUMPER_LOYALTY_PATH);
      },
    },
    {
      label: 'Scan',
      prefixIcon: <SearchOutlinedIcon />,
      showMoreIcon: false,
      link: { url: JUMPER_SCAN_PATH, external: false },
      onClick: () => {
        trackEvent({
          category: TrackingCategory.Menu,
          label: 'open-jumper-scan',
          action: TrackingAction.ClickJumperScanLink,
          data: { [TrackingEventParameter.Menu]: 'jumper_scan' },
        });
      },
    },
 
  ]);

  return mainMenu;
  //Todo: to generate on the server side
};
