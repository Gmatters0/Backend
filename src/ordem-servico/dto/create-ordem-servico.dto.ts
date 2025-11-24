export class CreateOrdemServicoDto {
  titulo: string;
  local: string;
  prioridade: 'baixa' | 'media' | 'alta';
  prestadorId: number;
}
