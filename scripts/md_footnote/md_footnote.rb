files = Dir.glob('./articles/*')
footnote_reg = /\(\(.*\)\)/

def delete_paren(str)
  str.gsub(/^\(\(/, '').gsub(/\)\)$/, '')
end

def replace_hatena2md_footnotes(md, notes)
  notes.each_with_index.reduce(md) do |res, (note, idx)|
    note_reg = Regexp.new(Regexp.escape(note))
    res.sub(note_reg, "[^#{idx + 1}]") + "\n[^#{idx + 1}]: " + delete_paren(note) + "\n"
  end
end

files.each do |file|
  md = File.read(file)
  notes = md.scan(footnote_reg)

  result = replace_hatena2md_footnotes(md, notes)

  File.write(file + '_u.md', result)
end
