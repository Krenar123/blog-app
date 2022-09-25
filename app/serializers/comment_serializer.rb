# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :commentable_type
  attribute :comment_replies, if: :has_comments?

  def comment_replies
    object.comment_replies.map do |reply|
      CommentReplySerializer.new(reply)
    end
  end

  def has_comments?
    object.comment_replies.present?
  end
end
