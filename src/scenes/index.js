import { UongNuoc, NoiCoSach, LuaThuVang, NuocDenChan } from './groupA.jsx';
import { HocThayHocBan, DiMotNgayDang, HocDiDoi } from './groupB.jsx';
import { GanMucGanDen } from './ganmuc.jsx';
import { CauKieu, SongCa, DaoMai, KheoAn, VeDuong, TramHay, NuocChay, DuocVoi, DongCam, CuoiNgua, MatBo, ThungRong } from './groupE.jsx';
import { CauKieu as CauKieuF, DiNgayDang, ThatBai as ThatBaiF } from './groupF.jsx';
import { DaoMai as DaoMaiG, KheoAn as KheoAnG, ThungRong as ThungRongG, VeDuong as VeDuongG, DongCam as DongCamG, MatBo as MatBoG } from './groupG.jsx';
import { KhongThay, TienHocLe, MotChu, HocAn, ThatBai, AnQua, LaLanh, LoiNoi, NguaDau } from './groupD.jsx';

/** id cảnh -> component. Thêm cảnh mới: viết component rồi đăng ký ở đây. */
export const SCENES = {
  khongthay: KhongThay,
  hocthay: HocThayHocBan,
  tienhoc: TienHocLe,
  motchu: MotChu,
  hocan: HocAn,
  dimotngay: DiNgayDang,
  thatbai: ThatBaiF,
  anqua: AnQua,
  uongnuoc: UongNuoc,
  lalanh: LaLanh,
  loinoi: LoiNoi,
  ngua: NguaDau,
  nuocden: NuocDenChan,
  ganmuc: GanMucGanDen,
  caukieu: CauKieuF,
  songca: SongCa,
  daomai: DaoMaiG,
  kheoan: KheoAnG,
  veduong: VeDuongG,
  tramhay: TramHay,
  nuocchay: NuocChay,
  duocvoi: DuocVoi,
  dongcam: DongCamG,
  cuoingua: CuoiNgua,
  matbo: MatBoG,
  thungrong: ThungRongG,
  hocdidoi: HocDiDoi,
  noicosach: NoiCoSach,
  luathuvang: LuaThuVang,
};
