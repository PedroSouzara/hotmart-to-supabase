import { createClient } from '@supabase/supabase-js';

// ⚠️ Evite deixar a chave exposta no código! Use variável de ambiente em produção
const supabaseUrl = 'https://iwfatsnzpywmddpqwrgz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3ZmF0c256cHltd2RkcHF3cmd6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM0ODc3NCwiZXhwIjoyMDY1OTI0Nzc0fQ._FqRVgrfAMwnL56fBzhiv0j45YKS-2RyjEBdcDjCiLk';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email não fornecido no body da requisição' });
  }

  try {
    const { data, error } = await supabase
      .from('authorized_buyers')
      .insert([{ email }]);

    if (error) {
      console.error('Erro ao inserir no Supabase:', error);
      return res.status(500).json({ message: 'Erro ao inserir no Supabase' });
    }

    return res.status(200).json({ message: 'Email salvo com sucesso!', data });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
