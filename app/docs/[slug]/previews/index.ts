import type { ComponentType } from "react";
import type { ComponentSlug } from "@/lib/registry";
import Button from "./button";
import Badge from "./badge";
import Card from "./card";
import Input from "./input";
import FileInput from "./file-input";
import Label from "./label";
import Separator from "./separator";
import Skeleton from "./skeleton";
import Spinner from "./spinner";
import Textarea from "./textarea";
import Checkbox from "./checkbox";
import Radio from "./radio";
import Switch from "./switch";
import Select from "./select";
import Portal from "./portal";
import Dialog from "./dialog";
import ConfirmModal from "./confirm-modal";
import Sheet from "./sheet";
import Popover from "./popover";
import Tooltip from "./tooltip";
import DropdownMenu from "./dropdown-menu";
import Toast from "./toast";
import Alert from "./alert";
import Avatar from "./avatar";
import Progress from "./progress";
import Breadcrumb from "./breadcrumb";
import EmptyState from "./empty-state";
import Tabs from "./tabs";
import Accordion from "./accordion";
import Table from "./table";
import Sidebar from "./sidebar";
import Combobox from "./combobox";
import Calendar from "./calendar";
import DatePicker from "./date-picker";
import DateTimePicker from "./date-time-picker";
import CommandPalette from "./command-palette";
import DataTable from "./data-table";

export const previews: Record<ComponentSlug, ComponentType> = {
  button: Button,
  badge: Badge,
  card: Card,
  input: Input,
  "file-input": FileInput,
  label: Label,
  separator: Separator,
  skeleton: Skeleton,
  spinner: Spinner,
  textarea: Textarea,
  checkbox: Checkbox,
  radio: Radio,
  switch: Switch,
  select: Select,
  portal: Portal,
  dialog: Dialog,
  "confirm-modal": ConfirmModal,
  sheet: Sheet,
  popover: Popover,
  tooltip: Tooltip,
  "dropdown-menu": DropdownMenu,
  toast: Toast,
  alert: Alert,
  avatar: Avatar,
  progress: Progress,
  breadcrumb: Breadcrumb,
  "empty-state": EmptyState,
  tabs: Tabs,
  accordion: Accordion,
  table: Table,
  sidebar: Sidebar,
  combobox: Combobox,
  calendar: Calendar,
  "date-picker": DatePicker,
  "date-time-picker": DateTimePicker,
  "command-palette": CommandPalette,
  "data-table": DataTable,
};
