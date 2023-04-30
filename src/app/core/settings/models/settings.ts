export class Settings {
  public static HttpFakeDelayEnabled: boolean = false;
  public static HttpFakeDelayInterval: number = 3000;
  public static ApplicationTitle: string = 'GCS | Складской учёт';
  public static InternalErrorMessage: string =
    'Что-то пошло не так ☹️ (мы уже работаем над этим)';
  public static PurchaseCreateSuccessSnackbarMessage: string =
    'Новая закупка добавлена';
  public static PurchaseUpdateSuccessSnackbarMessage: string =
    'Изменения сохранены';
  public static PurchaseDeleteSuccessSnackbarMessage: string =
    'Закупка удалена';
  public static SaleCreateSuccessSnackbarMessage: string = 'Продажа добавлена';
  public static SaleUpdateSuccessSnackbarMessage: string =
    'Изменения сохранены';
  public static SaleDeleteSuccessSnackbarMessage: string = 'Продажа удалена';
  public static ProfileUpdateSuccessSnackbarMessage: string =
    'Изменения сохранены';
}
