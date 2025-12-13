"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import cn from "classnames";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import {
  Check,
  Undo,
  Redo,
  Save,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  Table,
  Code,
  Eye,
  Download,
  Upload,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Type,
  Palette,
  Minus,
  ChevronLeft,
} from "lucide-react";
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { useThemeStore } from "@/features/toggle-theme";
import { Button } from "@/shared/ui/Button/Button";
import { useAuth } from "@/shared/hooks/auth";
import { articlesApi, IPostArticlePayload } from "@/entities/article";
import "./styles.scss";

export default function CreateArticle() {
  const router = useRouter();
  const { user, userProfile } = useAuth();
  const { theme } = useThemeStore();

  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [tag, setTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedBgColor, setSelectedBgColor] = useState("#ffffff");
  const [imgSrc, setImgSrc] = useState("");
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const colorPickerRef = useRef(null);
  const bgColorPickerRef = useRef(null);

  // Initialize editor
  useEffect(() => {
    if (editorRef.current && !isPreviewMode) {
      editorRef.current.innerHTML = content;
    }
  }, [isPreviewMode]);

  useEffect(() => {
    setFileName(title);
  }, [title]);

  const handlePublish = () => {
    const authorId = userProfile?.id || user?.id || "";

    const data: IPostArticlePayload = {
      category: "",
      imgSrc: imgSrc,
      title,
      content,
      href: uuidv4(),
      excerpt: subtitle,
      author: {
        id: authorId,
        firstName: userProfile?.firstName ?? "",
        lastName: userProfile?.lastName ?? "",
        avatarUrl: userProfile?.avatarUrl ?? "",
      },
    };

    articlesApi
      .createArticle(data)
      .then((res) => {
        // console.log(res.data);
        toast("Article successfully created!");
        router.push("/articles");
      })
      .catch((err) => {
        console.error(err);
        toast("Could not publish post");
      });
  };

  // Handle content change with history
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      if (newContent !== content) {
        setContent(newContent);

        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newContent);

        // Limit history to 50 items
        if (newHistory.length > 50) {
          newHistory.shift();
        } else {
          setHistoryIndex(historyIndex + 1);
        }

        setHistory(newHistory);
      }
    }
  }, [content, history, historyIndex]);

  // Undo/Redo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const newContent = history[newIndex];
      setContent(newContent);
      if (editorRef.current) {
        editorRef.current.innerHTML = newContent;
      }
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newContent = history[newIndex];
      setContent(newContent);
      if (editorRef.current) {
        editorRef.current.innerHTML = newContent;
      }
    }
  }, [history, historyIndex]);

  // Format commands
  const execCommand = useCallback(
    (command, value = null) => {
      document.execCommand(command, false, value);
      editorRef.current?.focus();
      setTimeout(handleContentChange, 10);
    },
    [handleContentChange]
  );

  // Custom handlers
  const handleImageInsert = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.style.maxWidth = "100%";
          img.style.height = "auto";
          img.style.cursor = "pointer";
          setImgSrc(img.src);
          // Make image resizable
          img.onclick = () => {
            const newWidth = prompt(
              "Enter width in pixels (or % for percentage):",
              "300"
            );
            if (newWidth) {
              img.style.width = newWidth.includes("%")
                ? newWidth
                : `${newWidth}px`;
            }
          };

          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(img);
            range.collapse(false);
          }
          setTimeout(handleContentChange, 10);
        };
        reader.readAsDataURL(file);
      }
    };
  }, [handleContentChange]);

  const handleVideoInsert = useCallback(() => {
    const url = prompt("Enter video URL (YouTube, Vimeo, etc.):");
    if (url) {
      let embedCode = "";

      if (url.includes("youtube.com") || url.includes("youtu.be")) {
        let videoId = "";
        if (url.includes("youtu.be/")) {
          videoId = url.split("youtu.be/")[1].split("?")[0];
        } else if (url.includes("youtube.com")) {
          videoId = url.split("v=")[1]?.split("&")[0];
        }

        if (videoId) {
          embedCode = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen style="max-width: 100%; height: auto;"></iframe>`;
        }
      } else if (url.includes("vimeo.com")) {
        const videoId = url.split("vimeo.com/")[1];
        embedCode = `<iframe width="560" height="315" src="https://player.vimeo.com/video/${videoId}" frameborder="0" allowfullscreen style="max-width: 100%; height: auto;"></iframe>`;
      } else {
        embedCode = `<video controls style="max-width: 100%; height: auto;"><source src="${url}" type="video/mp4">Your browser does not support the video tag.</video>`;
      }

      if (embedCode) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const div = document.createElement("div");
          div.innerHTML = embedCode;
          range.insertNode(div.firstChild);
          range.collapse(false);
        }
        setTimeout(handleContentChange, 10);
      }
    }
  }, [handleContentChange]);

  const handleLinkInsert = useCallback(() => {
    const url = prompt("Enter URL:");
    if (url) {
      const text = window.getSelection().toString() || url;
      execCommand("createLink", url);
    }
  }, [execCommand]);

  const handleTableInsert = useCallback(() => {
    const rows = prompt("Number of rows:", "3");
    const cols = prompt("Number of columns:", "3");

    if (rows && cols) {
      let tableHTML =
        '<table style="border-collapse: collapse; width: 100%; margin: 10px 0;"><tbody>';

      for (let i = 0; i < parseInt(rows); i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < parseInt(cols); j++) {
          tableHTML +=
            '<td style="border: 1px solid #ddd; padding: 8px; min-width: 50px;">Cell</td>';
        }
        tableHTML += "</tr>";
      }

      tableHTML += "</tbody></table>";

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const div = document.createElement("div");
        div.innerHTML = tableHTML;
        range.insertNode(div.firstChild);
        range.collapse(false);
      }
      setTimeout(handleContentChange, 10);
    }
  }, [handleContentChange]);

  // Save functionality
  const saveDocument = useCallback(() => {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [content, fileName]);

  // Load functionality
  const loadDocument = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleFileLoad = useCallback(
    (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const loadedContent = e.target.result;
          setContent(loadedContent);
          setFileName(file.name.replace(/\.[^/.]+$/, ""));

          if (editorRef.current) {
            editorRef.current.innerHTML = loadedContent;
          }

          // Add to history
          const newHistory = [...history, loadedContent];
          setHistory(newHistory);
          setHistoryIndex(newHistory.length - 1);
        };
        reader.readAsText(file);
      }
    },
    [history]
  );

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case "y":
            e.preventDefault();
            redo();
            break;
          case "b":
            e.preventDefault();
            execCommand("bold");
            break;
          case "i":
            e.preventDefault();
            execCommand("italic");
            break;
          case "u":
            e.preventDefault();
            execCommand("underline");
            break;
          case "s":
            e.preventDefault();
            saveDocument();
            break;
        }
      }
    },
    [undo, redo, execCommand, saveDocument]
  );

  const getWordCount = () => {
    const text = content.replace(/<[^>]*>/g, "");
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  };

  const getCharCount = () => {
    return content.replace(/<[^>]*>/g, "").length;
  };

  return (
    <div className="editor-container dark:bg-[rgba(13,13,13,0.6)]">
      {/* Header */}
      <div className="editor-header">
        <div className="editor-header-top">
          <Link
            className="editor-header-top-link text-green-750 dark:text-gray-400"
            href="/articles"
          >
            <ChevronLeft height="1em" />
            <span>Back</span>
          </Link>
          <div className="editor-header-top-btn-list">
            <Button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="border-[1px] border-green-800 hover:opacity-60"
              variant={theme === "dark" ? "transparent" : "white"}
            >
              Preview
            </Button>
            <Button variant="lightGreen" onClick={handlePublish}>
              Publish
            </Button>
          </div>
        </div>
        <div className="editor-header-separator bg-slate-200 dark:bg-gray-650"></div>
        <div className="editor-header-bottom">
          <div className="editor-actions text-neutral-950 dark:text-white">
            <button
              onClick={undo}
              disabled={historyIndex === 0}
              className="action-btn"
              title="Undo (Ctrl+Z)"
            >
              <HiArrowUturnLeft size={16} />
            </button>

            <button
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              className="action-btn"
              title="Redo (Ctrl+Y)"
            >
              <HiArrowUturnRight size={16} />
            </button>

            <button
              onClick={loadDocument}
              className="action-btn"
              title="Load document"
            >
              <Upload size={16} />
              Load
            </button>

            <button
              onClick={saveDocument}
              className="action-btn"
              title="Save document (Ctrl+S)"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      {!isPreviewMode && (
        <div className="toolbar-container">
          <div className="toolbar text-neutral-950 dark:text-white">
            {/* Text Style */}
            <div className="toolbar-group">
              <select
                className="toolbar-select"
                onChange={(e) => execCommand("formatBlock", e.target.value)}
                defaultValue=""
              >
                <option className="dark:text-black" value="">
                  Normal
                </option>
                <option className="dark:text-black" value="h1">
                  Heading 1
                </option>
                <option className="dark:text-black" value="h2">
                  Heading 2
                </option>
                <option className="dark:text-black" value="h3">
                  Heading 3
                </option>
                <option className="dark:text-black" value="h4">
                  Heading 4
                </option>
                <option className="dark:text-black" value="p">
                  Paragraph
                </option>
              </select>

              <select
                className="toolbar-select dark:bg-transparent"
                onChange={(e) => execCommand("fontSize", e.target.value)}
                defaultValue="3"
              >
                <option className="dark:text-black" value="1">
                  Very Small
                </option>
                <option className="dark:text-black" value="2">
                  Small
                </option>
                <option className="dark:text-black" value="3">
                  Normal
                </option>
                <option className="dark:text-black" value="4">
                  Large
                </option>
                <option className="dark:text-black" value="5">
                  Very Large
                </option>
                <option className="dark:text-black" value="6">
                  Huge
                </option>
                <option className="dark:text-black" value="7">
                  Maximum
                </option>
              </select>
            </div>

            {/* Basic Formatting */}
            <div className="toolbar-group">
              <button
                className="toolbar-btn"
                onClick={() => execCommand("bold")}
                title="Bold (Ctrl+B)"
              >
                <Bold size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("italic")}
                title="Italic (Ctrl+I)"
              >
                <Italic size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("underline")}
                title="Underline (Ctrl+U)"
              >
                <Underline size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("strikeThrough")}
                title="Strike Through"
              >
                <Minus size={16} />
              </button>
            </div>

            {/* Colors */}
            <div className="toolbar-group">
              <input
                ref={colorPickerRef}
                type="color"
                className="color-input"
                value={selectedColor}
                onChange={(e) => {
                  setSelectedColor(e.target.value);
                  execCommand("foreColor", e.target.value);
                }}
                title="Text Color"
              />

              <input
                ref={bgColorPickerRef}
                type="color"
                className="color-input"
                value={selectedBgColor}
                onChange={(e) => {
                  setSelectedBgColor(e.target.value);
                  execCommand("hiliteColor", e.target.value);
                }}
                title="Background Color"
              />
            </div>

            {/* Alignment */}
            <div className="toolbar-group">
              <button
                className="toolbar-btn"
                onClick={() => execCommand("justifyLeft")}
                title="Align Left"
              >
                <AlignLeft size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("justifyCenter")}
                title="Align Center"
              >
                <AlignCenter size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("justifyRight")}
                title="Align Right"
              >
                <AlignRight size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("justifyFull")}
                title="Justify"
              >
                <AlignJustify size={16} />
              </button>
            </div>

            {/* Lists */}
            <div className="toolbar-group">
              <button
                className="toolbar-btn"
                onClick={() => execCommand("insertUnorderedList")}
                title="Bullet List"
              >
                <List size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("insertOrderedList")}
                title="Numbered List"
              >
                <ListOrdered size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("outdent")}
                title="Decrease Indent"
              >
                ←
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("indent")}
                title="Increase Indent"
              >
                →
              </button>
            </div>

            {/* Special Formatting */}
            <div className="toolbar-group">
              <button
                className="toolbar-btn"
                onClick={() => execCommand("formatBlock", "blockquote")}
                title="Quote"
              >
                <Quote size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("formatBlock", "pre")}
                title="Code Block"
              >
                <Code size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={() => execCommand("insertHorizontalRule")}
                title="Horizontal Line"
              >
                <Minus size={16} />
              </button>
            </div>

            {/* Media & Links */}
            <div className="toolbar-group">
              <button
                className="toolbar-btn"
                onClick={handleLinkInsert}
                title="Insert Link"
              >
                <LinkIcon size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={handleImageInsert}
                title="Insert Image"
              >
                <Image size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={handleVideoInsert}
                title="Insert Video"
              >
                <Video size={16} />
              </button>

              <button
                className="toolbar-btn"
                onClick={handleTableInsert}
                title="Insert Table"
              >
                <Table size={16} />
              </button>
            </div>

            {/* Utilities */}
            <div className="toolbar-group">
              <button
                className="toolbar-btn"
                onClick={() => execCommand("removeFormat")}
                title="Clear Formatting"
              >
                <Type size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="editor-wrapper">
        {isPreviewMode ? (
          <div className="preview-container">
            <div
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          <div className="editor-body">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="title-input"
              placeholder="Title"
            />
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="subtitle-input"
              placeholder="Add a subtitle..."
            />
            <div className="editor-tags-wrapper">
              <ul className="editor-tags">
                {tags.map((tag) => (
                  <li className="editor-tag dark:border-green-800">
                    <span className="editor-tag-text">{tag}</span>
                    <button
                      onClick={() => setTags(tags.filter((t) => t !== tag))}
                      className="editor-tag-remove-btn"
                      type="button"
                    >
                      <RxCross2
                        className="text-green-750 dark:text-white"
                        height="1em"
                      />
                    </button>
                  </li>
                ))}
                <div className="editor-tag-add-wrapper">
                  {typeof tag === "string" && (
                    <input
                      className="editor-tag-add-input border-green-800"
                      placeholder="Tag"
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                    />
                  )}
                  <button
                    onClick={() => setTag(typeof tag === "string" ? null : "")}
                    className={`editor-tag-add-btn ${
                      !tag ? "border-green-800" : "border-none border-[0]"
                    }`}
                  >
                    <RxCross2
                      className={cn(
                        typeof tag === "string" ? "rotate-90" : "rotate-45",
                        "text-green-750 dark:text-white"
                      )}
                      height="1em"
                    />
                  </button>
                  {typeof tag === "string" && (
                    <button
                      onClick={() => {
                        if (tag) {
                          setTags([...tags, tag]);
                          setTag(null);
                        }
                      }}
                      className="editor-tag-add-btn border-green-800"
                    >
                      <Check
                        className="text-green-750 dark:text-white"
                        height="1em"
                      />
                    </button>
                  )}
                </div>
              </ul>
            </div>
            <div
              ref={editorRef}
              className="editor-content text-neutral-950 dark:text-white"
              contentEditable
              suppressContentEditableWarning={true}
              onInput={handleContentChange}
              onKeyDown={handleKeyDown}
              style={{ minHeight: "600px" }}
            />
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div className="format-info">
          <span>Characters: {getCharCount()}</span>
          <span>Words: {getWordCount()}</span>
          <span>
            History: {historyIndex + 1}/{history.length}
          </span>
        </div>
        <div>
          {!isPreviewMode &&
            "Ctrl+B: Bold | Ctrl+I: Italic | Ctrl+U: Underline | Ctrl+S: Save | Ctrl+Z: Undo"}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.txt"
        onChange={handleFileLoad}
        className="hidden-input"
      />
    </div>
  );
}
